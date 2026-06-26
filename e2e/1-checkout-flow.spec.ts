import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Flujo de Cliente: Compra y Persistencia', () => {
  test('Flujo de compra completo, persistencia de datos y guardado de orden', async ({ page }) => {
    // 1. Ir al catálogo público
    await page.goto('/');
    await expect(page).toHaveTitle(/Burger House/);

    // 2. Probar filtrado por categoría "Sides"
    await page.getByRole('button', { name: 'Sides' }).click();
    
    // 3. Buscar "Papas fritas" usando la barra de búsqueda
    const searchInput = page.locator('input[placeholder="Buscar producto..."]');
    await searchInput.fill('Papas fritas');
    
    // 4. Hacer click en la tarjeta de "Papas fritas" para abrir el modal
    await page.locator('text=Papas fritas').first().click();

    // 5. Interactuar con el stepper para subir la cantidad a 3
    const incrementBtn = page.locator('.fixed').getByRole('button', { name: '+' });
    await incrementBtn.click();
    await incrementBtn.click();
    
    // Verificar que la cantidad en el modal es 3
    const quantitySpan = page.locator('.select-none.min-w-\\[24px\\]');
    await expect(quantitySpan).toHaveText('3');

    // 6. Agregar al carrito y cerrar modal
    await page.getByRole('button', { name: 'Agregar al carrito' }).click();

    // 7. Ir a la página del carrito
    await page.goto('/cart');
    await expect(page.locator('h1')).toHaveText('Mi Carrito');
    
    // Validar subtotal e items en el carrito (Papas fritas cuesta $600 * 3 = $1800)
    await expect(page.locator('text=3 unidades')).toBeVisible();
    await expect(page.locator('text=1.800').first()).toBeVisible();

    // --- PRUEBA DE PERSISTENCIA DEL CARRITO ---
    // Recargar la página para verificar que Zustand + localStorage persisten los datos
    await page.reload();
    await expect(page.locator('text=3 unidades')).toBeVisible();
    await expect(page.locator('text=1.800').first()).toBeVisible();

    // 8. Hacer click en "Ir al checkout". Debería redirigir a /login ya que no estamos autenticados
    await page.getByRole('button', { name: 'Ir al checkout' }).click();
    await page.waitForURL('**/login**');
    await expect(page.locator('h1')).toHaveText('Burger House');

    // 9. Iniciar sesión como Cliente
    await page.locator('#email').fill('user@burguerhouse.com');
    await page.locator('#password').fill('password123');
    await page.getByRole('button', { name: 'Ingresar' }).click();

    // 10. Debería redirigir automáticamente al checkout (/checkout) con el carrito preservado
    await page.waitForURL('**/checkout');
    await expect(page.locator('h1')).toHaveText('Checkout');

    // 11. Llenar formulario de datos
    await page.locator('#name').fill('Usuario Común');
    await page.locator('#email').fill('user@burguerhouse.com');
    await page.locator('#phone').fill('+5491199998888');
    
    // Tipo de entrega: Ya está en "delivery" por defecto. Ponemos dirección:
    await page.locator('#address').fill('Av. Siempreviva 742');

    // Cambiar a pago "Efectivo" (que ya está seleccionado por defecto) o transferencia
    // El submit enviará el resumen
    await page.getByRole('button', { name: 'Revisar pedido' }).click();

    // 12. Pantalla de confirmación previa (/checkout/confirm)
    await page.waitForURL('**/checkout/confirm');
    await expect(page.locator('h1')).toHaveText('Confirmar Pedido');
    
    // Verificar items y totales
    await expect(page.locator('text=Papas fritas')).toBeVisible();
    await expect(page.locator('text=1.800').first()).toBeVisible();

    // 13. Confirmar compra (hace las peticiones POST /api/cart y POST /api/orders)
    await page.getByRole('button', { name: /Confirmar y Enviar Pedido/ }).click();

    // 14. Pantalla de éxito (/checkout/success)
    await page.waitForURL('**/checkout/success');
    await expect(page.locator('h1')).toHaveText('¡Pedido Recibido!');

    // Extraer ID de la orden generada de forma dinámica
    const orderNumText = await page.locator('.text-brand-orange-dark').innerText();
    const orderId = parseInt(orderNumText.replace('#', ''), 10);
    expect(orderId).toBeGreaterThan(0);

    // --- PRUEBA DE PERSISTENCIA DE SESIÓN ---
    // Recargar la página en /checkout/success para corroborar que no nos desloguea
    await page.reload();
    await expect(page.locator('.text-brand-orange-dark')).toHaveText(orderNumText);

    // El carrito debe estar vacío ahora
    await page.goto('/cart');
    await expect(page.locator('text=Tu carrito está vacío')).toBeVisible();

    // 15. Ir a historial de órdenes y verificar presencia de la orden en "pendiente"
    await page.goto('/orders');
    await expect(page.locator('h1')).toHaveText('Mis Pedidos');
    await expect(page.locator(`text=Orden #${String(orderId).padStart(5, '0')}`)).toBeVisible();
    
    // Guardar el número de orden en el entorno global de tests (opcionalmente pasándole a un archivo o validándolo en este test)
    console.log(`Orden generada exitosamente con ID: ${orderId}`);
    fs.writeFileSync(path.resolve('.order-id.tmp'), JSON.stringify({ orderId }));
  });
});
