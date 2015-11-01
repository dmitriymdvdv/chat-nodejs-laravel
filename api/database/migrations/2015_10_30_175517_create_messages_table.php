<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('messages', function(Blueprint $table)
		{
			$table->increments('id');
			$table->text('message');
			$table->dateTime('date_of_creation');
			$table->unsignedInteger('user_id');

			$table->foreign('user_id')->references('id')->on('users');

			$table->index(['user_id', 'id'], 'idx_user_id_message_id');

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('messages', function ($table) {

			$table->dropForeign('messages_user_id_foreign');

		});

		Schema::drop('messages');
	}

}
