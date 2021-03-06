<?php
Route::group(['prefix' => 'lectures'], function() {
	Route::get('/', 'LectureController@index');
	Route::get('/list', 'LectureController@index');
	Route::get('/{id}', 'LectureController@index');
	Route::get('/{id}/create', 'LectureController@index');
	Route::get('/{id}/edit', 'LectureController@index');
});

Route::group(['prefix' => 'room'], function() {
	Route::get('/{id}', 'LectureController@index');
	Route::get('/{id}/edit', 'LectureController@index');
});

Route::group(['prefix' => 'fetch/conferences'], function() {
	Route::get('', 'LectureController@lectures');
	Route::get('basic', 'LectureController@basic');
	Route::post('search', 'LectureController@search');
	Route::post('store', 'LectureController@store');
	Route::post('join', 'LectureController@join');
	Route::get('{id}', 'LectureController@lecture');
	Route::post('{id}/open', 'LectureController@open');
	Route::put('{id}', 'LectureController@update');
	Route::patch('{id}/activate', 'LectureController@activate');
	Route::patch('{id}/deactivate', 'LectureController@deactivate');
	Route::delete('{id}', 'LectureController@destroy');
    Route::patch('{id}/restore', 'LectureController@restore');

	Route::put('{id}/setting', 'LectureController@updateSetting');
});
