<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyConferencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('conference')->table('conferences', function (Blueprint $table) {
            $table->boolean('enable_message')->default(true);
            $table->boolean('enable_like')->default(true);
            $table->boolean('enable_reaction')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('conference')->table('conferences', function ($table) {
            $table->dropColumn('enable_message');
            $table->dropColumn('enable_like');
            $table->dropColumn('enable_reaction');
        });
    }
}
