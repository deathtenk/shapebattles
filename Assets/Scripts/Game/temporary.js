var life:float = 1.0;

function Update () 
{
	life -= Time.deltaTime;
	if(life <= 0.0)
	{
		Destroy(gameObject);
	}
}