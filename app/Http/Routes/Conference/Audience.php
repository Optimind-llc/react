<?php

Route::get('create/auditor', 'AudienceController@createAuditor');

Route::post('syncInfo', 'AudienceController@syncInfo');

Route::post('messages/send', 'AudienceController@sendMessage');

Route::post('messages/like', 'AudienceController@like');
Route::post('messages/dislike', 'AudienceController@dislike');

Route::post('reactions/send', 'AudienceController@sendReaction');

Route::get('/{id}', 'AudienceController@index');
Route::get('/{id}/info', 'AudienceController@conference');

