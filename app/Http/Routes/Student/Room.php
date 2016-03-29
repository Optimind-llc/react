<?php

Route::group(['prefix' => 'rooms'], function() {
	/**
	 * Student Controllers
	 */
    Route::group(['middleware' => 'guest'], function () {
    	Route::get('/{room_id}', 'RoomController@room');
    	Route::post('/{room_id}', 'RoomController@action');
    	Route::get('/{room_id}/status', 'RoomController@status');
    });

	/**
	 * Frontend Access Controllers
	 */
	// Route::group(['namespace' => 'Auth'], function () {

    // });
});