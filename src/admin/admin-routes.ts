import { AdminModule } from "./admin.module";
import { CategoryModule } from "./categories/category.module";

export const ADMIN_ROUTES = [
    {
        path: "admin", module: AdminModule,
        children: [
            { path: 'categoties', module: CategoryModule }
        ]

    }
];