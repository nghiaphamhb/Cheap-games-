import sympy
n=1
v1=0
v2=-1
m1=1
m2=m1*pow(10, n)
W=1/2*m2*v2**2
collisionObject='object'

def OnCollisionWithObject():
    p=m1*v1+m2*v2

    a=m1+(m1**2/m2)
    b=-2*p*m1/m2
    c=(p**2/m2)-2*W

    x=sympy.symbols('x')
    v1_solutions=sympy.solve(sympy.Eq(a*(x**2)+b*x+c,0))

    for v1_sol in v1_solutions:
        if v1_sol!=v1:
            new_v1=v1_sol
            break

    new_v2=(p-m1*new_v1)/m2
    return new_v1, new_v2

def OnCollisionWithWall():
    return -v1

count=0
while(True):
    if(collisionObject=='object'):
        v1, v2= OnCollisionWithObject()
        count+=1
        collisionObject='wall'
        print(v1, v2)
    elif(collisionObject=='wall'):
        v1=OnCollisionWithWall()
        # count+=1
        collisionObject='object'
    if(v2>v1 and v1>=0):
        break

print("Number of collisions: ", count)