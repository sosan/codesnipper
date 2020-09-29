

class ManagerLogica():
    def __init__(self):
        pass

    def getUUIdPage(self, idPage):
        uuid = idPage[0:8] + "-" + idPage[8:12] + "-" + idPage[12:16] + "-" + idPage[16:20] + "-" + idPage[20:]
        return uuid
