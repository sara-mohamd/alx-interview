#!/usr/bin/python3
"""_summary_
"""


def isWinner(x, nums):
    """_summary_

    Args:
        x (_type_): _description_
        nums (_type_): _description_
    """

    if not nums or x < 1:
        return None

    def calculate_primes(n):
        sieve = [True] * (n + 1)
        sieve[0] = sieve[1] = False
        for i in range(2, int(n ** 0.5) + 1):
            if sieve[i]:
                for j in range(i * i, n + 1, i):
                    sieve[j] = False
        return [i for i in range(n + 1) if sieve[i]]

    maria_wins = 0
    ben_wins = 0

    for n in nums:
        primes = calculate_primes(n)
        if len(primes) % 2 == 0:
            ben_wins += 1
        else:
            maria_wins += 1

    if maria_wins > ben_wins:
        return "Maria"
    elif maria_wins < ben_wins:
        return "Ben"
    else:
        return None
