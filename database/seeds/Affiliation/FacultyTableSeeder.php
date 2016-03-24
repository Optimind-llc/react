<?php

use Carbon\Carbon as Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class UserTableSeeder
 */
class FacultyTableSeeder extends Seeder
{
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        }

        if (env('DB_CONNECTION') == 'mysql') {
            DB::table('faculties')->truncate();
        } elseif (env('DB_CONNECTION') == 'sqlite') {
            DB::statement('DELETE FROM faculties');
        } else {
            //For PostgreSQL or anything else
            DB::statement('TRUNCATE TABLE faculties CASCADE');
        }

        $faculties = [
            [
                'name'       => '文学部',
                'sort'       => '1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '教育学部',
                'sort'       => '2',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '法学部',
                'sort'       => '3',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '経済学部',
                'sort'       => '4',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '情報文化学部',
                'sort'       => '5',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '理学部',
                'sort'       => '6',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '医学部',
                'sort'       => '7',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '工学部',
                'sort'       => '8',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '農学部',
                'sort'       => '9',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '文学研究科',
                'sort'       => '10',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '教育発達科学研究科',
                'sort'       => '11',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '法学研究科',
                'sort'       => '12',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '経済学研究科',
                'sort'       => '13',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '理学研究科',
                'sort'       => '14',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '医学系研究科',
                'sort'       => '15',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '工学研究科',
                'sort'       => '16',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '生命農学研究科',
                'sort'       => '17',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '国際開発研究科',
                'sort'       => '18',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '多元数理科学研究科',
                'sort'       => '19',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '国際言語文化研究科',
                'sort'       => '20',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '環境学研究科',
                'sort'       => '21',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '情報科学研究科',
                'sort'       => '22',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],[
                'name'       => '創薬科学研究科',
                'sort'       => '23',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ];

        DB::table('faculties')->insert($faculties);

        if (env('DB_CONNECTION') == 'mysql') {
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        }
    }
}