<?php
/**
 * Created by PhpStorm.
 * User: nafanyatsarkevich
 * Date: 10/29/15
 * Time: 4:51 AM
 */
namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    /**
     * The database table used by the Model.
     *
     * @var string
     */
    protected $table = 'chats';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name','description', 'is_private'];

    /**
     * The attributes excluded from the Model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['id','user_id'];
    /*
     * relations
     */
    public function messages()
    {
        return $this->belonsTo('App\Model\ChatMessages','chat_id');
    }
    /*
     *
     */
    public function users()
    {
        return $this->hasMany('App\Model\UserToChat','chat_id');
    }
    /*
     *
     */
    public function author()
    {
        return $this->belongsTo('App\Model\User','user_id');
    }
}
