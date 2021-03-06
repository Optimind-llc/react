<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LectureRelatedTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }
        $this->call(SemesterTableSeeder::class);
        $this->call(LectureTableSeeder::class);
        $this->call(RoomTableSeeder::class);
        $this->call(LectureTeacherSeeder::class);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }

    }
}
