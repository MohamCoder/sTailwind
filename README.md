# sTailwind
it is a better way yo write tailwind css with vars shortcuts you can make your html code ezer to change rather than changing every class manually. frst you declear vars inside this #root# as shoun in the code,<br>
than u can use any tailwind proprtys inside sharps to aplly any ptoprty yo is like #odd#(p-4) -> odd:p-4, the code come with small ui lib.<br>
you might see it in the title and asked ur self vars in html? well yeah you can create vars in html with out js or any other thing cz it will compile into ragular html lets start how to declear a var her is how<br> 
`<h1 class="#root#('$color$='green';$some style$='p-4 bg-$color$-500 inline-block h-6 w-12'$cool Var$='this is a cool var';)">$cool var$</h1> <div class="$some style$">foo</div> `<br>
. and the code will compile to <br>
`<h1>this is a cool var</h1> <div class="p-4 bg-green-500 inline-block">foo</div>`<br>
. fun fact:you can use root every where at moltipul times and you can use the any var befor declearing it and it will work just fine . you might noteced some thing, that the color of the shape can be changed with ez,<br>
by simply changing the color of the color var is this cool!! if you wrote some code with ragular tailwind css u might be annoyed by typing proprtys like hover,active,odd and the other proprtys for each time you want to add a class,<br>
this compiler can make it ezer by just simply spisfing what proprty u want to use than type what ever classes u want to use and the compiler will add the proprty to every class <br>
, u can do that by surrounding the proprty by ## and the you open a prackets and add the classes u want to add then close the praket like this: <br>
`<div class="p-4 bg-green-500 inline-block h-6 w-12 #hover#(p-6 bg-green-600)">hover me!</div> `<br>
the compiler will convert it into ragular html like this:<br>
`<div class="p-4 bg-green-500 inline-block h-6 w-12 hover:p-6 hover:bg-green-600">hover me!</div>`<br>
is this coool?! .<br>
you can use the active the compiler by runing `npm run dev`<br>
