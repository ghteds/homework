import csv

webCSV='../hw 3 py/budget_data.csv'

theCount=0
theSum=0
theAverages=[]
with open(webCSV,encoding='utf-8',newline='') as csvFile:
    csvreader =csv.reader(csvFile,delimiter=',')
    csv_header = next(csvreader)
    #print(len(csvreader))
    print ('Financial Analysis')
    print ('---------------------------------------')    
    for row in csvreader:
        '''
        print(row)
        print(row[0])   
        print(row[1])
        theCount = theCount + 1
        theSum = theSum + int(row[1])
        '''
        theCurrentValue=row[1]
        #theNextRow=next(csvreader)
        #theNextValue= theNextRow[1]
        theNextValue=row[1] + 1
        
        #print(theCurrentValue)
        #print(theNextValue)
        #theChange = int(theNextValue) - int(theCurrentValue)
        #theAverages.append('theChange')
        '''
        if (theNextValue < theCurrentValue):
            theNegChange = theChange
            print('neg: ' + str(theNegChange) )
        elif int(theNextValue) > int(theCurrentValue):
            thePosChange = theChange
            print('pos: ' + str(thePosChange))
        #print(theChange)
        else:
        '''        

#there are 86

print('theCount: ' + str(theCount))
print('theSum: ' + str(theSum))
print('averages count: ' + str(len(theAverages)))
