# What is Python?

Python is a dynamic, interpreted programming language used in many fields by many people. From data analysis, to machine learning, to even making graphical applications. It's a very powerful and unique language, and easy to pick up.

## Why Python?

Python gets straight to the point; it's more about understanding the code than taking the time to write thorough implementation. Python might not be the most popular language, but it's up there for a reason.

## What will this short web-based guide cover?

Just the basics of Python, enough to get someone on their feet.

Let's start with this block of code:

```python
print("Hello World!")
```

Looks pretty confusing to someone who has no experience. What does `print` mean? Why are there parenthesis? Or the quotes?

Let's break it down.

```python
print(...)
```

`print` is a *function*, or a *method*, which is basically something that takes in something, and puts out something. If you've taken algebra yet, it's the same thing as **f(x)**. If you haven't, think of it like a machine that you put stuff, called *input* or *arguments*, into, and then get stuff out of, called the *output*. 

The stuff inside of `print` acts as **input**! So, we put `"Hello World!"` as input into the `print` machine, and out comes what we put in it, `"Hello World!"`. I know it seems useless, but trust me we'll need `print` more often than you think. So basically, `print` takes in a **string** `"Hello World!"` and *prints* it to the screen, bringing it back.

## Strings

But what is a **string**? A **string** is a "sequence of characters". What this really means is basically it's just more than one symbol or letter. So `"ab"` is a string, `"verylongwords"` is a string, and `"23"` is even a string. But wait. How is `"23"` a string?

Well, because of the quotes! AKA the `"` symbols around it. Technically, even `"!"` is a string too, even though it's one character. Typically, one **char**, or *character*, uses single quotes, like `'`. So `'a'` is a character, but `"a"` is a string.

There is one thing to say though. I've actually been lying this whole time. The double and single quotes don't matter, specifically in Python. I know it's strange, but actually `"a"` vs. `'a'` isn't a thing in Python, but in other programming languages it is. So characters are single symbols, but in Python there is no special way to make something a character, it just is. I'll teach you that in due time, don't worry. For now, just know that strings are basically glorified words and symbols combined together.

Example code block:
```python live
print("Hello from Python!")
print("2 + 2 =", 2 + 2)

for i in range(5):
    print(f"Number {i}")
    if i % 2 == 0:
        print("  Even!")
```

