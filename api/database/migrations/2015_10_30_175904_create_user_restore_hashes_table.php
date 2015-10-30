<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserRestoreHashesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_restore_hashes', function(Blueprint $table)
		{
			$table->unsignedInteger('user_id');
			$table->string('restore_token',255);
			$table->dateTime('expired');

			$table->foreign('user_id')->references('id')->on('users');

			$table->index('user_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('user_restore_hashes');
	}

}
