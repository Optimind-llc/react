<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReactionsTableForConference extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('conference')->create('reactions', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('auditor_id')->unsigned();
            $table->integer('conference_id')->unsigned();
            $table->tinyInteger('type')->default(0);

            // Add Foreign/Unique/Index
            $table->foreign('conference_id')
                ->references('id')
                ->on('conferences')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('conference')->drop('reactions');
    }
}
