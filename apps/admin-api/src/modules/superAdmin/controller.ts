import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import SuperAdminService, {
  type GetAdminUsersOptions,
} from "#src/modules/superAdmin/service.ts"
import {
  adminCreationSchema,
  adminUpdateSchema,
} from "@app/schemas/admin/user"

/**
 * Controller for all super admin related APIs routes.
 */
export default class SuperAdminController extends BaseController {
  /**
   * @route GET /api/super-admin/admin
   * 
   * Fetch all admin users.
   */
  static async listAdmins({ query }: Request, res: Response) {
    try {
      const paginationQueries: GetAdminUsersOptions = super.parsePaginationQueries(query)

      const data = await SuperAdminService.listAdmins(paginationQueries)

      super.sendSuccess(res, {
        message: "Fetched Admin Users",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route POST /api/super-admin/admin
   * 
   * Create a new admin user.
   */
  static async createAdmin({ body }: Request, res: Response) {
    try {
      const admin = super.validateRequest(adminCreationSchema, body)

      const data = await SuperAdminService.createAdmin(admin)

      super.sendSuccess(res, {
        data,
        message: "Created Admin User",
        status: 201,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route GET /api/super-admin/admin/permissions
   * 
   * Fetch admin permission list.
   */
  static async listAdminPermissions(_req: Request, res: Response) {
    try {
      const data = await SuperAdminService.listAdminPermissions()

      super.sendSuccess(res, {
        data,
        message: "Fetched Admin Permissions",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route GET /api/super-admin/admin/:adminId
   * 
   * Fetch admin user by id.
   */
  static async getAdminById({ params }: Request, res: Response) {
    try {
      const adminId = super.parseObjectId(params.adminId)
      if (!adminId) {
        throw {
          status: 400,
          message: "Invalid admin id",
        }
      }

      const data = await SuperAdminService.getAdminById(adminId)

      super.sendSuccess(res, {
        data,
        message: "Fetched Admin User",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route PATCH /api/super-admin/admin/:adminId
   * 
   * Update admin user by id.
   */
  static async updateAdmin({ params, body }: Request, res: Response) {
    try {
      const adminId = super.parseObjectId(params.adminId)
      if (!adminId) {
        throw {
          status: 400,
          message: "Invalid admin id",
        }
      }

      const admin = super.validateRequest(adminUpdateSchema, body)

      const data = await SuperAdminService.updateAdmin(adminId, admin)

      super.sendSuccess(res, {
        data,
        message: "Updated Admin User",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route DELETE /api/super-admin/admin/:adminId
   * 
   * Delete admin user by id.
   */
  static async deleteAdmin({ params }: Request, res: Response) {
    try {
      const adminId = super.parseObjectId(params.adminId)
      if (!adminId) {
        throw {
          status: 400,
          message: "Invalid admin id",
        }
      }

      await SuperAdminService.deleteAdmin(adminId)

      super.sendSuccess(res, {
        message: "Deleted Admin User",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
