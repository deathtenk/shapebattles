var bullet : GameObject;

function Start ()
{
	Messenger.instance.Listen("gun" , this);
}

function _PlayerFire(msg:MessagePlayerFire)
{
	Instantiate(bullet, transform.position, transform.rotation);
}

function launchBullet()
{
}