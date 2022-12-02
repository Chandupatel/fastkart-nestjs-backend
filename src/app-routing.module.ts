import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { ADMIN_ROUTES } from "./admin/admin-routes";
import { USER_ROUTES } from "./users/user-routes";

const ROUTES = [...ADMIN_ROUTES, ...USER_ROUTES];

@Module({
    imports: [RouterModule.register(ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule { }