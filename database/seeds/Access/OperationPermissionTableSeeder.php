<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserRoleSeeder
 */
class OperationPermissionTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table(config('access.operation_permission_table'))->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM ' . config('access.operation_permission_table'));
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE ' . config('access.operation_permission_table') . ' CASCADE');
        }

        $role_admin = DB::table(config('access.operation'))
            ->where('name', 'Administrator')
            ->first();

        $role_teacher = DB::table(config('access.operation'))
            ->where('name', 'Teacher')
            ->first();

        //Attach user role to general user
        $user_model = config('auth.providers.users.model');
        $user_model = new $user_model;
        $user_model::where('email', 'admin@admin.com')->first()->roles()->attach($role_admin->id);

        //Attach user role to general user
        $user_model = config('auth.providers.users.model');
        $user_model = new $user_model;
        $user_model::where('name', 'Admin Istrator')->first()->roles()->attach($role_teacher->id);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}