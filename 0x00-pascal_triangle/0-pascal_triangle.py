#!/usr/bin/python3
"""pascal_triangle module"""


def pascal_triangle(n):
    """
    returns list of lists of int representing the Pascal’s triangle of n .
    Returns an empty list if n <= 0
    """
    if n <= 0:
        return []

    triangle = [[1]]
    for row_num in range(1, n):
        row = [1] * (row_num + 1)
        triangle.append(row)
        for i in range(1, len(row) - 1):
            row[i] = triangle[row_num - 1][i - 1] + triangle[row_num - 1][i]

    return triangle
