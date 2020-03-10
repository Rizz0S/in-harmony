# Everybody Loves Fractals!

Made by Summer Rizzo & Sean Welsh Brown.

Hosted at: https://everybodylovesfractals.netlify.com/

## What are Fractals?

I'm glad you asked! Fractals are complex geometric patterns that are defined by self-similarity. In other words, their inner components resemble the whole shape. Due to their recursive nature, they can, essentially, continue indefinitely when magnified. This scaling symmetry lends particularly well to computer generated graphics - which is what we're doing here!

There are many purely geometric examples of fractals - a few famous ones are the Sierpinski Triangle, Koch Snowflake, and Dragon Curve:

However, although they *technically* cannot be infinite, fractals also appear in nature. Think of a lightning bolt, a leaf vein, a coastline from above, or a branching tree - see how they resemble a fractal pattern?

Such similarities have not gone unnoticed. In fact, it is a perfect segway into our next topic.

## Our Drawing Instructions: L-Systems

Fractals can be drawn a few different ways, most of which involve recursion. However, we are using the specific method of the Lindenmayer System - or L-System. 

What is an L-System? Another fantastic question! First and foremost, it's a language system that operates with a specific grammar. It consists of an "alphabet" that is used to write "production rules" that are used to generatively calculate a string of instructions, with a base case that the production rules are initially operated on (the axiom). In the late 1960s, a botanist named Astrid Lindenmayer used L-Systems to describe plant cells, growth processes, and plant development. They are generally fairly simple, compared to what they produce, which is why they are so attractive for the kind of fractal generation we're doing here. Here is what they look like at a basic level:

**Alphabet:** A B

**Axiom:** A

**Rule 1:** A → ABA

**Rule 2:** B → BB

n = 0: A

n = 1: ABA

n = 3: ABA BB ABA

n = 4: ABA BB ABA BB BB ABA BB ABA

In our L-System, which is quite common for fractal generation, looks like this:

### Terms:

**Theta:** This refers to the angle the lines turn.

**Length:** This refers to the initial length of the line segment. It decreases with each generation.

**Axiom:** This is the base rule.

**Ruleset F:** For each encounter of 'F', these instructions are appended.

**Ruleset G:** For each encounter of 'G', these instructions are appended.

### Rule Definitions:

**F:** Move forward and draw a line.

**G:** Move forward, but do not draw a line.

**+:** Rotate at the angle defined by theta.

**-:** Rotate at the angle opposite of theta.

**[:** Save current state (push)

**]:** Return to saved state (pop)

Based on the parameters passed in, we first calculate the string of instructions with a recursive function, and then draw them iteratively onto a canvas.

## At this time, this application is designed to draw fractal trees.

Although all kinds of fractals can be drawn with L-Systems, this implementation of them works best with fractal trees. Due to fractal pattern's irregular scaling rate, we found that this was the most versatile for keeping the drawing on the canvas (we want you to be able to see your lovely fractal creations!). The drawing point is currently fixed, but we hope to make it more dynamic in the futu

# What was this site built with?

For the front end, we're using JavaScript with the React framework with P5.js. For the back end, we're using Rails as an API. 

### Special Thanks

Endless thanks to Dan Shiffman, for his enthusiasm for graphics processing. He is the reason we were able to implement this in such a short time span 
(less than 5 days!). Without him, this application would not as shiny as it is. If you are interested, please look into his work - you will not be disappointed!
