<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToUsersTableOnConferenceDb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('conference')->table('users', function (Blueprint $table) {
            $table->tinyInteger('teacher_confirmed')->default(0)->unsigned();
            $table->string('corporate_name')->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('conference')->table('users', function ($table) {
            $table->dropColumn('teacher_confirmed');
            $table->dropColumn('corporate_name');
        });
    }
}
