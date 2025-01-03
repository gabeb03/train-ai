import type { GadgetPermissions } from "gadget-server";

/**
 * This metadata describes the access control configuration available in your application.
 * Grants that are not defined here are set to false by default.
 *
 * View and edit your roles and permissions in the Gadget editor at https://ai-trainer.gadget.app/edit/settings/permissions
 */
export const permissions: GadgetPermissions = {
  type: "gadget/permissions/v1",
  roles: {
    "signed-in": {
      storageKey: "signed-in",
      default: {
        read: true,
        action: true,
      },
      models: {
        activity: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        chat: {
          read: {
            filter: "accessControl/filters/chat/tenant.gelly",
          },
          actions: {
            create: true,
            delete: {
              filter: "accessControl/filters/chat/tenant.gelly",
            },
            name: {
              filter: "accessControl/filters/chat/tenant.gelly",
            },
            update: {
              filter: "accessControl/filters/chat/tenant.gelly",
            },
          },
        },
        message: {
          read: {
            filter: "accessControl/filters/message/tenant.gelly",
          },
          actions: {
            create: true,
          },
        },
        score: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        user: {
          read: {
            filter: "accessControl/filters/user/tenant.gelly",
          },
          actions: {
            changePassword: {
              filter: "accessControl/filters/user/tenant.gelly",
            },
            signOut: {
              filter: "accessControl/filters/user/tenant.gelly",
            },
          },
        },
      },
    },
    unauthenticated: {
      storageKey: "unauthenticated",
      models: {
        activity: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        score: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        user: {
          actions: {
            resetPassword: true,
            sendResetPassword: true,
            sendVerifyEmail: true,
            signIn: true,
            signUp: true,
            verifyEmail: true,
          },
        },
      },
    },
  },
};
