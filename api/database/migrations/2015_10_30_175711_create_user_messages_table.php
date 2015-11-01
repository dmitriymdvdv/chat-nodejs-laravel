<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserMessagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_messages', function(Blueprint $table)
		{
			$table->unsignedInteger('message_id');
			$table->unsignedInteger('recipient_id');

			$table->foreign('message_id')->references('id')->on('messages');
			$table->foreign('recipient_id')->references('id')->on('users');


		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('user_messages', function ($table) {

			$table->dropForeign('user_messages_message_id_foreign');
			$table->dropForeign('user_messages_recipient_id_foreign');

		});

		Schema::drop('user_messages');
	}

}
