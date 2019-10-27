#!/usr/bin/env python3

import numpy as np
import copy
import math

def minimax(node, maximizingPlayer):
    state = checkBoardState(node)
    if state != 'in progress':
        if state == 'draw':
            return { 'state': node, 'value': 0 }
        elif state == 'x':
            return { 'state': node, 'value': 1 }
        else:
            return { 'state': node, 'value': -1 }

    selectedState = None

    if maximizingPlayer:
        value = -math.inf
        children = getChildrenOfNode(node, True)
        for child in children:
            result = minimax(child, False)
            if value < result['value']: 
                value = result['value'] 
                selectedState = child
                    
            return { 'state': selectedState, 'value': value } 
    else:
        value = math.inf
        children = getChildrenOfNode(node, False)
        for child in children:
            result = minimax(child, True)
            if value > result['value']:
                value = result['value'] 
                selectedState = child
        
        return { 'state': selectedState, 'value': value } 

def printBoard(board, maximizingPlayer):
    if maximizingPlayer:
        print("Player X")
    else:
        print("Player O")

    for row in board:
        for square in row:
            print(square, end=' ')
        print()
    print("===================")

def getChildrenOfNode(node, maximizingPlayer):
    children = []

    for i in range(len(node)):
        for j in range(len(node[i])):
            if node[i][j] is None:
                child = copy.deepcopy(node)

                if maximizingPlayer:
                    child[i][j] = 'x'
                else:
                    child[i][j] = 'o'

                children.append(child)

    return children

def checkBoardState(board):   
    #transposition to check rows, then columns
    for newBoard in [board, np.transpose(board)]:
        winner = checkRows(newBoard)
        if winner:
            return winner
        else:
            winner = checkDiagonals(board)
            if winner:
                return winner

    for row in board:
        if None in row:
            return 'in progress'

    return 'draw'

def checkRows(board):
    for row in board:
        if len(set(row)) == 1:
            return row[0]
    return 0

def checkDiagonals(board):
    if len(set([board[i][i] for i in range(len(board))])) == 1:
        return board[0][0]
    if len(set([board[i][len(board)-i-1] for i in range(len(board))])) == 1:
        return board[0][len(board)-1]
    return 0

def getNextMove(board, playerToMove):
    if playerToMove == 'x':
        maximizingPlayer = True
    else:
        maximizingPlayer = False
    return minimax(board, maximizingPlayer)

if __name__ == "__main__":
    origin = [
        [None, None, None],
        [None, None, None],
        [None, None, None]
    ]
    printBoard(origin, True)
    result = minimax(origin, True)
    printBoard(result['state'], True)
