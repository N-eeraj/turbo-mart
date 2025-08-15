// OpenAPI documentation for routes handled by GeneralController.
// Each documented route corresponds to a method in GeneralController.

/**
 * @openapi
 * /api/ping:
 *   get:
 *     tags:
 *       - General
 *     summary: Health check
 *     description: Health check endpoint to verify server status.
 *     responses:
 *       200:
 *         description: Server is reachable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: pong
 *                 message:
 *                   type: string
 *                   example: Reached Server
 */

/**
 * @openapi
 * /api/{anyPath}:
 *   get:
 *     tags:
 *       - General
 *     summary: Catch-all 404 handler
 *     description: Handles unmatched API routes.
 *     parameters:
 *       - in: path
 *         name: anyPath
 *         required: true
 *         schema:
 *           type: string
 *         description: Any unmatched route
 *     responses:
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 errors:
 *                   type: string
 *                   example: Not Found
 *                 message:
 *                   type: string
 *                   example: Cannot find the URL
 */
