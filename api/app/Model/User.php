<?php
/**
 * Created by PhpStorm.
 * User: nafanyatsarkevich
 * Date: 10/29/15
 * Time: 4:36 AM
 */
namespace App\Model;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class User extends Model implements Authenticatable
{
    public $timestamps = false;

    /**
     * The database table used by the Model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [ 'email','password','first_name',
                            'last_name','date_of_birth',
                            'mobile_phone','avatar_url'];

    /**
     * The attributes excluded from the Model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['pivot','password'];

    /*
     *
     */
    public function chats()
    {
        return $this->belongsToMany('App\Model\Chat','users_to_chats');
    }
    /*
     *
     */
    public function message()
    {
        return $this->hasMany('App\Model\Message','user_id');
    }
    /*
     *
     */
    public function userMessages()
    {
        return $this->hasMany('App\Model\UserMessages','user_id');
    }
    /*
     *
     */
    public function userRestoreHashes()
    {
        return $this->hasMany('App\Model\UserRestoreHashes','user_id');
    }
    /*
     *
     */
    public function chatMaster()
    {
        return $this->hasMany('App\Model\Chat','user_id');
    }

    public function setRememberToken($value)
    {
        // TODO: Implement setRememberToken() method.
    }
    public function getRememberToken()
    {
        // TODO: Implement getRememberToken() method.
    }
    public function getAuthPassword()
    {
        // TODO: Implement getAuthPassword() method.
    }
    public function getRememberTokenName()
    {
        // TODO: Implement getRememberTokenName() method.
    }
    public function getAuthIdentifier()
    {
        // TODO: Implement getAuthIdentifier() method.
    }
}