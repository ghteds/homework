import csv

file="../hw 3 py/letters.csv"


with open(file, newline='') as f:
    theReader = csv.reader(f,delimiter=',')
    theHeader=next(theReader)


    # for row in theReader:
        # print (row[0])