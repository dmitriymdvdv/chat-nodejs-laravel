<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('email',255)->unique();
			$table->string('password',255);
			$table->string('first_name',255);
			$table->string('last_name',255);
			$table->date('date_of_birth');
			$table->string('mobile_phone')->unique();
			$table->string('avatar_url');
			$table->rememberToken()->nullable();
			$table->timestamps();

		});

		DB::statement("ALTER TABLE users ADD FULLTEXT users_email_fulltext(email)");
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
