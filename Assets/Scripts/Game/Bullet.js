var bulletSpeed : double = 50;

function Update () 
{
	transform.Translate(Vector3.up * bulletSpeed * Time.deltaTime);
}

function OnCollisionEnter(collision : Collision)
{	
	if (!collision.transform.CompareTag("multiplier"))
	{
		yield WaitForSeconds (0.01);
		Destroy(transform.gameObject);
	}
}