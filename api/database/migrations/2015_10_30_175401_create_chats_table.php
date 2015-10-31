<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChatsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('chats', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('name',255);
            $table->string('description',255);
            $table->boolean('is_private');
			$table->unsignedInteger('user_id');

			$table->foreign('user_id')->references('id')->on('users');

            $table->index(['user_id','name'],'idx_user_id_name');

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('chats');
	}

}
