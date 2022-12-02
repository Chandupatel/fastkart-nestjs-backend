import { UsersModule } from "./users.module";

export const USER_ROUTES = [
    {
        path: "admin", module: UsersModule,
        children: [
        ]

    }
];