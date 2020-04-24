---
layout: post
title: "Floor Sum of Arithmetic Progression and Other Variants"
tags:
  - Competitive Programming
  - Math
  - Number Theory
comments: true
published: true
---

Recently I was going through the solutions of [this](http://poj.org/problem?id=3495) problem. I was very surprised to see very short solutions of many 
Chinese coders and found out that they use a cool trick for solving this kind of problems. But I could not find anything in English on this. So I had to learn everything using Google Translate :triumph: . This is is my attempt on sharing everything I have learned. Let's begin! :smiley:

## Notations

-   $\left[P\right] = 1$, if $P$ is true. Otherwise, $\left[P\right] = 0$.

-   $S_{k}(n) = \sum\limits_{i = 0}^{n} i^{k}$

## Problem 1

Given $a, b, c, n$, compute $\sum\limits_{x = 0}^{n}  \left\lfloor{\frac{ax + b}{c}}\right\rfloor$.

### Solution

Let us denote
$f(a, b, c, n) = \sum_\limits{x = 0}^{n}  \left\lfloor{\frac{ax + b}{c}}\right\rfloor$.\\
Consider the case when $a \geq c$ or $ b \geq  c$. Then we have,

$$\begin{aligned}f(a, b, c, n) =&{\sum\limits_{x = 0}^{n}}  \left\lfloor{\frac{ (  \left\lfloor{\frac{a}{c}}\right\rfloor c + (a \bmod c) )x +  \left\lfloor{\frac{b}{c}}\right\rfloor c + (b \bmod c)}{c}}\right\rfloor \\ =& {\sum\limits_{x = 0}^{n}} \left( \left\lfloor{\frac{a}{c}}\right\rfloor x +  \left\lfloor{\frac{b}{c}}\right\rfloor +   \left\lfloor{\frac{ (a \bmod c)x + (b \bmod c)}{c}}\right\rfloor \right) \\ =& \frac{n(n + 1)}{2} \left\lfloor{\frac{a}{c}}\right\rfloor + (n + 1) \left\lfloor{\frac{b}{c}}\right\rfloor + f(a \bmod c, b \bmod c, c, n)\end{aligned}$$

Now we just need to find $f(a, b, c, n)$ when $a < c$ and $b < c$.\\
\\
We have, $$f(a, b, c, n) = {\sum\limits_{x = 0}^{n}}  \left\lfloor{\frac{ax + b}{c}}\right\rfloor$$\\
\\
We can also write it like this,

$$\begin{aligned}f(a, b, c, n) =& {\sum\limits_{x = 0}^{n} \sum\limits_{y = 0}^{  \left\lfloor{\frac{ax + b}{c}}\right\rfloor - 1}} 1 \\ =&
{\sum\limits_{y = 0}^{  \left\lfloor{\frac{an + b}{c}}\right\rfloor - 1} \sum\limits_{x = 0}^{n}}\left[y <  \left\lfloor{\frac{ax + b}{c}}\right\rfloor \right]\end{aligned}$$

Now,

$$\begin{aligned}
& y <  \left\lfloor{\dfrac{ax + b}{c}}\right\rfloor  \\ \implies & y + 1 \leq \dfrac{ax + b}{c} \\ \implies &cy + c - b \leq ax \\ \implies & cy + c - b - 1 < ax \\ \implies &  \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor < x \end{aligned}$$

Let $m = an + b$,

$$\begin{aligned}
f(a, b, c, n) =& {\sum\limits_{y = 0}^{m - 1} \sum\limits_{x = 0}^{n}}\left[x >  \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor\right] \\ =&
{\sum\limits_{y = 0}^{m - 1}} n -  \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor \\ =&
mn - {\sum\limits_{y = 0}^{m - 1}} \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor \\ =&
mn - f(c, c - b - 1, a, m - 1)\end{aligned}$$

Thus we have obtained a recursive function for our problem. For any
state where $a < c$ and $b < c$, $a$ and $c$ change their positions in
the next state and the process repeats. Otherwise we make a and b
smaller than c by taking the remainder. This process is similar to the
Euclidean algorithm.

### Complexity
$\mathcal{O}(log(a))$

### Code
<!-- {% highlight cpp linenos %}{% endhighlight %} -->
{% highlight cpp linenos %} long long FloorSumAP(long long a, long long b, long long c, long long n){
  if(!a) return (b / c) * (n + 1);
  if(a >= c or b >= c) return ( ( n * (n + 1) ) / 2) * (a / c) + (n + 1) * (b / c) + FloorSumAP(a % c, b % c, c, n);
  long long m = (a * n + b) / c;
  return m * n - FloorSumAP(c, c - b - 1, a, m - 1);
}{% endhighlight %}

<br>

---
## Problem 2

Given $a, b, c, n$, compute
${\sum\limits_{x = 0}^{n}} x \left\lfloor{\frac{ax + b}{c}}\right\rfloor$ and
${\sum\limits_{x = 0}^{n}}  \left\lfloor{\frac{ax + b}{c}}\right\rfloor^{2}$.

### Solution

Let $g(a, b, c, n) = {\sum\limits_{x = 0}^{n}} x \left\lfloor{\frac{ax + b}{c}}\right\rfloor$ and $h(a, b, c, n) = {\sum\limits_{x = 0}^{n}}  \left\lfloor{\frac{ax + b}{c}}\right\rfloor^{2}$.
\\
We will proceed similarly to our previous problem.

#### Deriving g

-   When $a \geq c$ or $b \geq c$,
    
    $$$$

    $$\begin{aligned}g(a, b, c, n) =& {\sum\limits_{x = 0}^{n}} x  \left\lfloor{\frac{ (  \left\lfloor{\frac{a}{c}}\right\rfloor c + (a \bmod c) )x +  \left\lfloor{\frac{b}{c}}\right\rfloor c + (b \bmod c)}{c}}\right\rfloor \\ =& {\sum\limits_{x = 0}^{n}} \left( \left\lfloor{\frac{a}{c}}\right\rfloor x^{2} +  \left\lfloor{\frac{b}{c}}\right\rfloor x +  x \left\lfloor{\frac{ (a \bmod c)x + (b \bmod c)}{c}}\right\rfloor \right) \\ =& \frac{n(n + 1)(2n + 1)}{6} \left\lfloor{\frac{a}{c}}\right\rfloor + \frac{n(n + 1)}{2}\left\lfloor{\frac{b}{c}}\right\rfloor + g(a \bmod c, b \bmod c, c, n)\end{aligned}$$

-   When $a < c$ and $b < c$,

    $$\begin{aligned} g(a, b, c, n) =& {\sum\limits_{x = 0}^{n} x\sum\limits_{y = 0}^{ \left\lfloor{\frac{ax + b}{c}}\right\rfloor - 1}} 1 \\ =&
    {\sum\limits_{y = 0}^{  \left\lfloor{\frac{an + b}{c}}\right\rfloor - 1} \sum\limits_{x = 0}^{n}}\left[y <  \left\lfloor{\frac{ax + b}{c}}\right\rfloor \right]x \\ =& 
    {\sum\limits_{y = 0}^{m - 1} \sum\limits_{x = 0}^{n}}\left[x >  \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor\right]x \end{aligned}$$

    Let $z =  \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor$,

    $$\begin{aligned}g(a, b, c, n) =& {\sum\limits_{y = 0}^{m - 1} \sum\limits_{x = 0}^{n}}\left[x > z\right]x \\ =& {\sum\limits_{y = 0}^{m - 1}} {(z + 1) + (z + 2) \ldots (z + (n - z))} \\ =& \frac{1}{2} {\sum\limits_{y = 0}^{m - 1}} {(n + z + 1)(n - z)} \\ =& \frac{1}{2} 
    {\sum\limits_{y = 0}^{m - 1}} { n(n + 1) -z -z^{2}} \\ =& \frac{mn(n + 1)}{2} - \frac{1}{2} \left({\sum\limits_{y = 0}^{m - 1}} {z}\right) - \frac{1}{2} \left({\sum\limits_{y = 0}^{m - 1}} {z^{2}}\right)\\ =& \frac{mn(n + 1)}{2} - \frac{1}{2} \left({\sum\limits_{y = 0}^{m - 1}} { \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor}\right) - \frac{1}{2} \left({\sum\limits_{y = 0}^{m - 1}} { \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor^{2}}\right)\\ =& \frac{mn(n + 1)}{2} - \frac{1}{2} f(c, c - b - 1, a, m - 1) - \frac{1}{2} h(c, c - b - 1, a, m - 1)\end{aligned}$$

#### Deriving h

-   When $a \geq c$ or $b \geq c$,

    $$\begin{aligned}
     h(a, b, c, n) =&
    {\sum\limits_{x = 0}^{n}}  \left\lfloor{\frac{ (  \left\lfloor{\frac{a}{c}}\right\rfloor c + (a \bmod c) )x +  \left\lfloor{\frac{b}{c}}\right\rfloor c + (b \bmod c)}{c}}\right\rfloor^{2}\\ =&
    {\sum\limits_{x = 0}^{n}} \left( \left\lfloor{\frac{a}{c}}\right\rfloor x +  \left\lfloor{\frac{b}{c}}\right\rfloor +   \left\lfloor{\frac{ (a \bmod c)x + (b \bmod c)}{c}}\right\rfloor\right)^{2}\\ =&
    {\sum\limits_{x = 0}^{n}}  \left\lfloor{\frac{a}{c}}\right\rfloor^{2}x^{2} +  \left\lfloor{\frac{b}{c}}\right\rfloor^{2} +   \left\lfloor{\frac{ (a \bmod c)x + (b \bmod c)}{c}}\right\rfloor^{2} + 2 \left\lfloor{\frac{a}{c}}\right\rfloor \left\lfloor{\frac{b}{c}}\right\rfloor x \\+& 2 \left\lfloor{\frac{b}{c}}\right\rfloor  \left\lfloor{\frac{ (a \bmod c)x + (b \bmod c)}{c}}\right\rfloor +  \left\lfloor{\frac{a}{c}}\right\rfloor x \left\lfloor{\frac{ (a \bmod c)x + (b \bmod c)}{c}}\right\rfloor \\ =&
    \frac{n(n + 1)(2n + 1)}{6} \left\lfloor{\frac{a}{c}}\right\rfloor ^{2} + (n + 1) \left\lfloor{\frac{b}{c}}\right\rfloor ^{2} + n(n + 1) \left\lfloor{\frac{a}{c}}\right\rfloor  \left\lfloor{\frac{b}{c}}\right\rfloor + \left({\sum\limits_{x = 0}^{n}} \left\lfloor{\frac{ (a \bmod c)x + (b \bmod c)}{c}}\right\rfloor^{2}\right) \\& + \left(2 \left\lfloor{\frac{b}{c}}\right\rfloor{\sum\limits_{x = 0}^{n}} \left\lfloor{\frac{ (a \bmod c)x + (b \bmod c)}{c}}\right\rfloor\right)
     + \left(2 \left\lfloor{\frac{a}{c}}\right\rfloor{\sum\limits_{x = 0}^{n}}x \left\lfloor{\frac{ (a \bmod c)x + (b \bmod c)}{c}}\right\rfloor\right) \\=&
    \frac{n(n + 1)(2n + 1)}{6} \left\lfloor{\frac{a}{c}}\right\rfloor^{2} + (n + 1) \left\lfloor{\frac{b}{c}}\right\rfloor^{2} + n(n + 1) \left\lfloor{\frac{a}{c}}\right\rfloor \left\lfloor{\frac{b}{c}}\right\rfloor + h(a \bmod c, b \bmod c, c, n) \\& + 2 \left\lfloor{\frac{b}{c}}\right\rfloor f(a \bmod c, b \bmod c, c, n)
     + 2 \left\lfloor{\frac{a}{c}}\right\rfloor g(a \bmod c, b \bmod c, c, n)\end{aligned}$$

-   When $a < c$ and $b < c$, \\
    Working with the square term is not easy. So, let's break it down.

    $$\begin{aligned}n^2 = n(n + 1) - n = 2 \left(\sum\limits_{i = 0}^{n - 1} i + 1\right) - n\end{aligned}$$

    Using this we get,

    $$\begin{aligned}
    h(a, b, c, n) =& {\sum\limits_{x = 0}^{n}}  \left\lfloor{\frac{ax + b}{c}}\right\rfloor^{2}\\ =&
    {\sum\limits_{x = 0}^{n}} \left(2{\left(\sum\limits_{y = 0}^{ \left\lfloor{\frac{ax + b}{c}}\right\rfloor - 1} y + 1\right)} -  \left\lfloor{\frac{ax + b}{c}}\right\rfloor\right)\\ =&
    \left(2{\sum\limits_{x = 0}^{n}\sum\limits_{y = 0}^{m - 1}} (y + 1)\right) - f(a, b, c, n) \end{aligned}$$

    Now,

    $$\begin{aligned}
    {\sum\limits_{x = 0}^{n}\sum\limits_{y = 0}^{m - 1} y + 1} =& {\sum\limits_{y = 0}^{m - 1} (y + 1)\sum\limits_{x = 0}^{n}} \left[ x > z \right]\\ =&
    {\sum\limits_{y = 0}^{m - 1}} (y + 1) (n - z)\\ =&
    \left({\sum\limits_{y = 0}^{m - 1}}(y + 1)n\right) - \left({\sum\limits_{y = 0}^{m - 1}}yz\right) - \left({\sum\limits_{y = 0}^{m - 1}}z\right) \\ =& \left({\sum\limits_{y = 0}^{m - 1}}(y + 1)n\right) - \left({\sum\limits_{y = 0}^{m - 1}}y \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor \right) - \left({\sum\limits_{y = 0}^{m - 1}} \left\lfloor{\dfrac{cy + c -b - 1}{a}}\right\rfloor\right) \\ =&
    \frac{mn(m + 1)}{2} - g(c, c - b - 1, a, m - 1) - f(c, c - b - 1, a, m - 1)\end{aligned}$$

    Finally,
    $$\begin{aligned} h(a, b, c, n) = mn(m + 1) - 2g(c, c - b - 1, a, m - 1) - 2f(c, c - b - 1, a, m - 1) - f(a, b, c, n) \end{aligned}$$

### Implementation
  The functions $g$ and $h$ are dependent on each other. So if we naively write three recursive functions there will be too many function calls and the complexity will be huge. Notice that the calls to the next state of all the functions are similar. So, we can use structure instead. For every state we will calculate the three functions simultaneously, save them in a structure and return the structure. This way we don't have to call the functions over and over again.

### Complexity 
$$\mathcal{O}\left(3log(a)\right)$$
<!-- <center>$$\mathcal{O}\left(3log(a)\right)$$</center> -->

### Code

{% highlight cpp linenos %}{% raw %}struct dat {
  long long f, g, h;
  dat(long long f = 0, long long g = 0, long long h = 0) : f(f), g(g), h(h) {};
};

long long mul(long long a, long long b){
  return (a * b) % MOD;
}

dat query(long long a, long long b, long long c, long long n){
  if(!a) return {mul(n + 1, b / c), mul(mul(mul(b / c, n), n + 1), inv2), mul(mul(n + 1, b / c), b /c)};
  long long f, g, h; 
  dat nxt;
  if(a >= c or b >= c){
    nxt = query(a % c, b % c, c, n);
    f = (nxt.f + mul(mul(mul(n, n + 1), inv2), a / c) + mul(n + 1, b / c)) % MOD;
    g = (nxt.g + mul(a / c, mul(mul(n, n + 1), mul(2 * n + 1, inv6))) + mul(mul(b / c, mul(n, n + 1)), inv2)) % MOD;
    h = (nxt.h + 2 * mul(b / c, nxt.f) + 2 * mul(a / c, nxt.g) + mul(mul(a / c, a / c), mul(mul(n, n + 1), mul(2 * n + 1, inv6))) + mul(mul(b / c, b / c), n + 1) + mul(mul(a / c, b / c), mul(n, n + 1)) ) % MOD;   
    return {f, g, h};
  }
  long long m = (a * n + b ) / c;
  nxt = query(c, c - b - 1, a, m - 1);
  f = (mul(m, n) - nxt.f) % MOD;
  g = mul( mul(m, mul(n, n + 1)) - nxt.h - nxt.f, inv2);
  h = (mul(n, mul(m, m + 1)) - 2 * nxt.g - 2 * nxt.f - f) % MOD;
  return {f, g, h};
}{% endraw %}{% endhighlight %}

<br>

---

## Problem 3 

Given $a, b, c, n, {k_{1} }, k_{2}$, compute ${\sum\limits_{x = 0}^{n} } x^{ {k_{1} }}  \left\lfloor{\frac{ax + b}{c} } \right\rfloor^{ {k_{2} }}$.

### Solution

Let us denote $F({k_{1} }, k_{2}, a, b, c, n) = {\sum\limits_{x = 0}^{n} } x^{k_{1} }  \left\lfloor{\frac{ax + b}{c} } \right\rfloor^{k_{2} }$

-   When $a \geq c$,

    $$\begin{aligned}F({k_{1} }, k_{2}, a, b, c, n) =& {\sum\limits_{x = 0}^{n} } x^{k_{1} }  \left\lfloor{\frac{ax + b}{c} } \right\rfloor^{k_{2} } \\ =& {\sum\limits_{x = 0}^{n} } x^{k_{1} } \left(  \left\lfloor{\frac{a}{c} } \right\rfloor x +  \left\lfloor{\frac{ (a \bmod c) x + b}{c} } \right\rfloor \right)^{k_{2} } \\ =& {\sum\limits_{x = 0}^{n} } x^{k_{1} } {\sum\limits_{y = 0}^{k_{2} }} \binom{k_{2} }{y} \left(  \left\lfloor{\frac{a}{c} } \right\rfloor x\right)^{y} \left\lfloor{\frac{ (a \bmod c) x + b}{c} } \right\rfloor^{ {k_{2} } - y} \\ =& {\sum\limits_{y = 0}^{k_{2} }} \binom{k_{2} }{y}  \left\lfloor{\frac{a}{c} } \right\rfloor^{y} {\sum\limits_{x = 0}^{n} } x^{ {k_{1} } + y} \left\lfloor{\frac{ (a \bmod c) x + b}{c} } \right\rfloor^{ {k_{2} } - y} \\ =& {\sum\limits_{y = 0}^{k_{2} }} \binom{k_{2} }{y}  \left\lfloor{\frac{a}{c} } \right\rfloor^{y} F({k_{1} } + y, k_{2} - y, a \bmod c, b, c, n) \end{aligned}$$

-   When $b \geq c$ and $a < c$,

    $$\begin{aligned}
        F({k_{1} }, k_{2}, a, b, c, n) =& {\sum\limits_{x = 0}^{n} } x^{k_{1} }  \left\lfloor{\frac{ax + b}{c} } \right\rfloor^{k_{2} } \\ =& {\sum\limits_{x = 0}^{n} } x^{k_{1} } \left(  \left\lfloor{\frac{b}{c} } \right\rfloor +  \left\lfloor{\frac{ ax + (b \bmod c)}{c} } \right\rfloor\right)^{k_{2} } \\ =& {\sum\limits_{x = 0}^{n} } x^{k_{1} } {\sum\limits_{y = 0}^{k_{2} }} \binom{k_{2} }{y} \left(  \left\lfloor{\frac{b}{c} } \right\rfloor\right)^{y} \left\lfloor{\frac{ ax + (b \bmod c)}{c} } \right\rfloor^{ {k_{2} } - y} \\ =& {\sum\limits_{y = 0}^{k_{2} }} \binom{k_{2} }{y}  \left\lfloor{\frac{b}{c} } \right\rfloor^{y} {\sum\limits_{x = 0}^{n} } x^{ {k_{1} }} \left\lfloor{\frac{ ax + (b \bmod c)}{c} } \right\rfloor^{ {k_{2} } - y} \\ =& {\sum\limits_{y = 0}^{k_{2} }} \binom{k_{2} }{y}  \left\lfloor{\frac{b}{c} } \right\rfloor^{y} F({k_{1} }, k_{2} - y, a, b \bmod c, c, n) \\
      \end{aligned}$$

-   When $a < c$ and $b < c$,\\
    Notice that, we can write $x^n$ as,

    $$\begin{aligned}x^n = \sum\limits_{i = 0}^{x - 1} \left(i + 1\right)^n - i^n \end{aligned}$$

    Now,

    $$\begin{aligned}
        F({k_{1} }, k_{2}, a, b, c, n) =& {\sum\limits_{x = 0}^{n} } x^{k_{1} }  \left\lfloor{\frac{ax + b}{c} } \right\rfloor^{k_{2} } \\ =& {\sum\limits_{x = 0}^{n} } x^{k_{1} } {\sum\limits_{y = 0}^{m - 1} }\left[y <  \left\lfloor{\frac{ax + b}{c} } \right\rfloor\right]\left(y + 1\right)^{k_{2} } - y^{k_{2} } \\ =& {\sum\limits_{y = 0}^{m - 1} }\left(\left(y + 1\right)^{k_{2} } - y^{k_{2} }\right) {\sum\limits_{x = 0}^{n} } x^{k_{1} } \left[x > z\right] \\ =& {\sum\limits_{y = 0}^{m - 1} }\sum\limits_{i = 0}^{k_{2} - 1}\binom{k_{2} }{i} y^{i} \left({\sum\limits_{x = 0}^{n} } x^{k_{1} } - \sum\limits_{x = 0}^{z} x^{k_{1} }z\right) \\ =& {\sum\limits_{i = 0}^{k_{2} - 1}\binom{k_{2} }{i}\sum\limits_{y = 0}^{m - 1} } y^{i} \left(S_{ {k_{1} }}(n) - S_{ {k_{1} }}(z)\right) \\ =& {\sum\limits_{i = 0}^{k_{2} - 1}\binom{k_{2} }{i} }S_{i}(m - 1) S_{ {k_{1} }}(n) - {\sum\limits_{i = 0}^{k_{2} - 1}\binom{k_{2} }{i}\sum\limits_{y = 0}^{m - 1} } y^{i} S_{ {k_{1} }}(z)
      \end{aligned}$$

    $S_{k}(n)$ is a $k + 1$th degree [polynomial function](https://en.wikipedia.org/wiki/Faulhaber%27s_formula) of $n$, ie.

    $$\begin{aligned}S_{k}(n) = \sum\limits_{i = 0}^{n} i^{k} = \sum\limits_{i = 0}^{k + 1} d_{ {k} {i} } \times n^{i}\end{aligned}$$

    We can calculate this polynomial using [Lagrange polynomial](https://en.wikipedia.org/wiki/Lagrange_polynomial) or
    [Bernoulli numbers](https://en.wikipedia.org/wiki/Bernoulli_number#Sum_of_powers). So, we can easily calculate the first part of our
    equation. For the second part,

    $$\begin{aligned}{\sum\limits_{i = 0}^{k_{2} - 1}\binom{k_{2} }{i}\sum\limits_{y = 0}^{m- 1} } y^{i} S_{ {k_{1} }}(z) =& {\sum\limits_{i = 0}^{k_{2} - 1}\binom{k_{2} }{i}\sum\limits_{y = 0}^{m - 1} } y^{i} \sum\limits_{j = 0}^{ {k_{1} } + 1} d_{ {k_{1} }{j} } \times z^{j} \\ =& {\sum\limits_{i = 0}^{k_{2} - 1}\binom{k_{2} }{i}\sum\limits_{j = 0}^{ {k_{1} } + 1} d_{ {k_{1} }{j} }\sum\limits_{y = 0}^{m - 1} } y^{i} \times  \left\lfloor{\frac{cy + c - b - 1}{a} } \right\rfloor^{j} \\ =& {\sum\limits_{i = 0}^{k_{2} - 1}\binom{k_{2} }{i}\sum\limits_{j = 0}^{ {k_{1} } + 1} d_{ {k_{1} }{j} }} \times F(i, j, c, c - b - 1, a, m - 1)\end{aligned}$$

    We can solve this by precomputing $d_{ {k}{j} }$ for all possible $k$.

### Implementation and Complexity

Like our previous problem, we will again use structure. For any state (a, b, c, n) we will calculate $F(k_{1}', k_{2}', a, b, c, n)$ for all possible $k_{1}', k_{2}'$ such that, $k_{1}' + k_{2}' \leq k_{1} + k_{2}$. We will store these values in a structure. If we do this naively the complexity will be $\mathcal{O}( (k_{1} + k_{2})^{4} log(a) )$. However, notice that $\sum\limits_{j = 0}^{ {k_{1} } + 1} d_{ {k_{1} }{j} } \times F(i, j, c, c - b - 1, a, m - 1)$ doesn’t depend on $k_{2}$. So we can precalculate this for every $i$ and our complexity will be $\mathcal{O}( (k_{1} + k_{2})^{3} log(a) )$.

### Code

{% highlight cpp linenos %}{% raw %}dat F(long long k1, long long k2, long long a, long long b, long long c, long long n){
  if(!a){
    dat ret;
    for(int _k1 = 0; _k1 <= k1 + k2; ++_k1){
      ret.F[_k1][0] = powerSum(n, _k1);
      for(int _k2 = 1; _k1 + _k2 <= k1 + k2; ++_k2){
        ret.F[_k1][_k2] = (ret.F[_k1][0] * bigMod(b / c, _k2)) % MOD;
      }
    }
    return ret;
  }

  dat ret;

  if(a >= c){
    dat nxt = F(k1, k2, a % c, b, c, n);
    for(int _k1 = 0; _k1 <= k1 + k2; ++_k1){
      ret.F[_k1][0] = powerSum(n, _k1);
      for(int _k2 = 1; _k1 + _k2 <= k1 + k2; ++_k2){
        ret.F[_k1][_k2] = 0;
        for(int y = 0; y <= _k2; ++y){
          ret.F[_k1][_k2] += ((ncr[_k2][y] * bigMod(a / c, y) ) % MOD) * nxt.F[_k1 + y][_k2 - y];
          ret.F[_k1][_k2] %= MOD;
        }
      }
    }
  }

  else if(b >= c){
    dat nxt = F(k1, k2, a, b % c, c, n);
    for(int _k1 = 0; _k1 <= k1 + k2; ++_k1){
      ret.F[_k1][0] = powerSum(n, _k1);
      for(int _k2 = 1; _k1 + _k2 <= k1 + k2; ++_k2){
        ret.F[_k1][_k2] = 0;
        for(int y = 0; y <= _k2; ++y){
          ret.F[_k1][_k2] += ((ncr[_k2][y] * bigMod(b / c, y) ) % MOD) * nxt.F[_k1][_k2 - y];
          ret.F[_k1][_k2] %= MOD;
        }
      }
    }
  }

  else {
    long long m = (a * n + b) / c;
    dat nxt = F(k1, k2, c, c - b - 1, a, m - 1);
    std::vector<long long> psumM(k1 + k2 + 1), pre(k1 + k2 + 1);
    for(int i = 0; i <= k1 + k2; ++i)psumM[i] = powerSum(m - 1, i);
    for(int _k1 = 0; _k1 <= k1 + k2; ++_k1){
      for(int i = 0; i <= k1 + k2; ++i){
        pre[i] = 0;
        for(int j = 0; j <= _k1 + 1; ++j){
          pre[i] += (d[_k1][j] * nxt.F[i][j]) % MOD;
          pre[i] %= MOD;
        }
      }
      ret.F[_k1][0] = powerSum(n, _k1);
      for(int _k2 = 1; _k1 + _k2 <= k1 + k2; ++_k2){
        ret.F[_k1][_k2] = 0;
        for(int i = 0; i < _k2; ++i){
          ret.F[_k1][_k2] += ( (ncr[_k2][i] * psumM[i]) % MOD) * ret.F[_k1][0];
          ret.F[_k1][_k2] -= ncr[_k2][i] * pre[i];
          ret.F[_k1][_k2] %= MOD;
        }
      }
    }
  }
  return ret;
}{% endraw %}{% endhighlight %}

<br>

---

## Related Problems

- [POJ 3495](http://poj.org/problem?id=3495)
- [Luogu 5170](https://www.luogu.com.cn/problem/P5170)
- [LOJ 138](https://loj.ac/problem/138)
- [Topcoder SRM 410 WifiPlanet](https://community.topcoder.com/stat?c=problem_statement&pm=9733&rd=12182)

<br>
Thanks for reading! :smiley:
<br>
