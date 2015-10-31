<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChatMessagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('chat_messages', function(Blueprint $table)
		{
			$table->unsignedInteger('message_id');
			$table->unsignedInteger('chat_id');

			$table->foreign('message_id')->references('id')->on('messages');
			$table->foreign('chat_id')->references('id')->on('chats');

			$table->index(['message_id','chat_id'],'idx_message_id_chat_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('chat_messages');
	}

}
