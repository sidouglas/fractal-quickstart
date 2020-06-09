Was always going to be a challenge to complete within the time frame. 

I struggled with validating regions. After much toil, I hard coded the region bounds. 
Definitely much longer than expected — probably around 6 hours. 

I didn't complete the sudoku solver nor undo requirements. 

From the outset, I modelled the data on a linked list, whereby it could be easy to look up adjacent tiles in order
to validate them. This seemed to work fine for validating rows and columns. This was definitely a problem though
when it came to validating regions. In the end I hard coded it.

There's a test file that I wrote when creating the linked list, but I stopped short of testing the regions.

Styling the board was fairly straight forward. With BEM, there shouldn't be any cascade. This became problematic 
with border thickness around the regions. In the end I used this approach here (https://codepen.io/sdobson/pen/aEWBQw) 
due to time constraints.
 
The functions/mixins/objects inside the style directory are NRL toolkit scss files — i.e not my code.

This fractal setup is my own — you can see it here https://github.com/sidouglas/fractal-quickstart

```
yarn dev  // will run the fractal instance
```
