import csv

file="../hw 3 py/election_data.csv"


with open(file, newline='') as f:
    theReader = csv.reader(f,delimiter=',')
    theHeader=next(theReader) #['Voter ID', 'County', 'Candidate']
    theCount=0
 
    #print(theHeader)
    Candidates=[]
    Counties=[]
    Khan=0
    Correy=0
    Li=0
    Tooley=0
    totalVotes=0
    twinner=''

    print('Election Results')
    print('---------------------------------------------')
    for row in theReader:
        theID=row[0]
        theCounty=row[1]
        theCandidate=row[2]
        theCount = theCount +1
        
        if theCandidate not in Candidates:    #Khan,Correy,Li,O'Tooley
            Candidates.append(theCandidate)
            
        # if theCounty not in Counties:
        #     Counties.append(theCounty)
     
        
    
    # for c in Candidates:
    #     print(c)
        
        if theCandidate=='Khan':
            Khan=Khan + 1
        elif theCandidate=='Correy':
            Correy=Correy + 1
        elif theCandidate=='Li':
            Li=Li + 1
        elif theCandidate=='O\'Tooley':
            Tooley=Tooley + 1



    #print('tooley: ' + str(Tooley))           
    totalVotes= int(Khan) + int(Correy) + int(Li) + int(Tooley)
    print('Total Votes: ' + str(totalVotes))
    #get percents
    pKhan= int(Khan)/totalVotes
    pCorrey= int(Correy)/totalVotes
    pLi= int(Li)/totalVotes
    pTooley= int(Tooley)/totalVotes

    print('---------------------------------------------')

    #write and format
    print(str("Khan: {:.2%} ".format(pKhan)) + '(' + str(Khan) + ')')
    print(str("Correy: {:.2%} ".format(pCorrey)) + '(' + str(Correy) + ')')
    print(str("Li: {:.2%} ".format(pLi)) + '(' + str(Li) + ')')
    print(str("O\'Tooley: {:.2%} ".format(pTooley)) + '(' + str(Tooley) + ')')
    
    print('---------------------------------------------')


    winner = max(Khan,Correy,Li,Tooley,)
    if winner == Khan:
        twinner = 'Khan'
    elif winner ==Correy:
        twinner = 'Correy'
    elif winner ==Li:
        twinner = 'Li'
    elif winner ==Tooley:
        twinner = 'O\'Tooley'

    print('The Winner is: ' + twinner)

    outfile="../hw 3 py/python-challenge/PyPoll/election_results.csv"

    with open(outfile,'w',newline='') as csvFile:
        csvwriter=csv.writer(csvFile,delimiter=',')
        csvwriter.writerow(['Election Results'])
        csvwriter.writerow(['Total Votes',totalVotes])
        csvwriter.writerow(['Khan', pKhan, Khan])
        csvwriter.writerow(['Correy',pCorrey,Correy])
        csvwriter.writerow(['Li',pLi,Li])
        csvwriter.writerow(['O\'Tooley',pTooley,Tooley])
        csvwriter.writerow(['Winner',twinner])
