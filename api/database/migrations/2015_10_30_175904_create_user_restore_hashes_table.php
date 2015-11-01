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
			$table->string('restore_token',255);
			$table->dateTime('expired');
			$table->unsignedInteger('user_id');

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
		Schema::table('user_restore_hashes', function ($table) {

			$table->dropForeign('user_restore_hashes_user_id_foreign');

		});

		Schema::drop('user_restore_hashes');
	}

}
