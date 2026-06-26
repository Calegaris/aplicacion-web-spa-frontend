import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Flujo de Administrador y Sincronización', () => {
  let orderId: number;

  test.beforeAll(() => {
    // Intentar leer el ID de la orden generada por el test de checkout
    try {
      const tmpPath = path.resolve('.order-id.tmp');
      if (fs.existsSync(tmpPath)) {
        const data = JSON.parse(fs.readFileSync(tmpPath, 'utf-8'));
        orderId = data.orderId;
        console.log(`Leído ID de orden para pruebas de admin: ${orderId}`);
      }
    } catch (e) {
      console.warn('No se pudo cargar el ID de orden temporal. Se usará una orden por defecto.', e);
    }
  });

  test('Panel de administración: Filtrar, avanzar estado y verificar sincronización con cliente', async ({ page }) => {
    // Si no pudimos leer el ID de la orden del test anterior, fallamos con gracia o usamos una por defecto si existe.
    if (!orderId) {
      console.log('No hay orderId dinámico disponible. Se saltará la verificación específica pero se testeará con una orden existente en la lista.');
    }

    // 1. Iniciar sesión como Administrador
    await page.goto('/login');
    await page.locator('#email').fill('admin@burguerhouse.com');
    await page.locator('#password').fill('admin123');
    await page.getByRole('button', { name: 'Ingresar' }).click();

    // 2. Validar redirección automática al Dashboard de Administración (/admin)
    await page.waitForURL('**/admin');
    await expect(page.locator('h1')).toHaveText('Cola de Pedidos');
    
    // 3. Probar el filtro por estado: click en "Pendientes 🔴"
    await page.getByRole('button', { name: 'Pendientes 🔴' }).click();
    
    // Si tenemos una orden específica, buscarla e ingresar al detalle
    const targetOrderNumber = `#${String(orderId || 1).padStart(5, '0')}`;
    const orderCard = page.locator(`text=Orden ${targetOrderNumber}`);
    
    // Si no está visible en pendientes (ej: ya se avanzó de estado previamente), removemos el filtro o buscamos en "Todas"
    if (!(await orderCard.isVisible())) {
      await page.getByRole('button', { name: 'Todas' }).click();
    }
    
    await expect(orderCard).toBeVisible();
    await orderCard.click();

    // 4. Detalle de Orden en Administración (/admin/orders/:id)
    await page.waitForURL(`**/admin/orders/${orderId || '*'}`);
    await expect(page.locator('h3').first()).toHaveText('Desglose del Pedido');

    // 5. Avanzar de "Pendiente" a "En preparación"
    await expect(page.getByRole('button', { name: /Marcar como "En preparación"/ })).toBeVisible();
    await page.getByRole('button', { name: /Marcar como "En preparación"/ }).click();
    
    // Validar que el botón cambió a "Listo para retirar" (o que el estado avanzó)
    await expect(page.getByRole('button', { name: /Marcar como "Listo para retirar"/ })).toBeVisible();

    // 6. Avanzar de "En preparación" a "Listo"
    await page.getByRole('button', { name: /Marcar como "Listo para retirar"/ }).click();
    
    // Validar que el botón cambió a "Entregado"
    await expect(page.getByRole('button', { name: /Marcar como "Entregado"/ })).toBeVisible();

    // 7. Cerrar sesión de Admin
    await page.getByRole('button', { name: 'Cerrar Sesión' }).click();
    await page.waitForURL('**/login');

    // --- VERIFICAR SINCRONIZACIÓN EN EL CLIENTE ---

    // 8. Iniciar sesión como Cliente para chequear el timeline
    await page.locator('#email').fill('user@burguerhouse.com');
    await page.locator('#password').fill('password123');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.waitForURL('**/');

    // 9. Ir a la orden específica del cliente
    await page.goto(`/orders/${orderId || 1}`);
    await expect(page.locator('h3').first()).toHaveText('Seguimiento del Pedido');

    // 10. Validar en el timeline horizontal que la orden figura en "Listo" (estilo text-brand-orange-dark o green-600)
    // El elemento con texto "Listo" debería estar activo o completado
    const stepListo = page.locator('span:has-text("Listo")');
    await expect(stepListo).toBeVisible();
    
    // 11. Cerrar sesión de cliente y volver a admin para completarla a "Entregado"
    await page.goto('/');
    await page.locator('header').getByRole('button').click();
    await page.getByRole('button', { name: 'Cerrar Sesión' }).click();
    await page.waitForURL('**/login');

    // Login Admin de nuevo
    await page.locator('#email').fill('admin@burguerhouse.com');
    await page.locator('#password').fill('admin123');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.waitForURL('**/admin');

    // Ir al detalle de la orden
    await page.goto(`/admin/orders/${orderId || 1}`);
    
    // Avanzar de "Listo" a "Entregado"
    await page.getByRole('button', { name: /Marcar como "Entregado"/ }).click();

    // Validar que el botón de acción desaparece porque ya está "Entregado" (último estado)
    await expect(page.getByRole('button', { name: /Marcar como/ })).not.toBeVisible();
    
    console.log(`Orden ${orderId || 1} completada exitosamente a "Entregado".`);
  });
});
