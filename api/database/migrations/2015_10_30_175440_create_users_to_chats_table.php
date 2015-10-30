<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersToChatsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users_to_chats', function(Blueprint $table)
		{
			$table->unsignedInteger('user_id');
			$table->unsignedInteger('chat_id');

			$table->foreign('user_id')->references('id')->on('users');
			$table->foreign('chat_id')->references('id')->on('chats');

            $table->index(['user_id','chat_id'], 'idx_user_id_chat_id');

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users_to_chats');
	}

}
