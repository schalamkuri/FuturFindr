import app
import unittest

# Influenced by GeoJob's implementation

class Tests(unittest.TestCase):
    '''
        Set up common resources and constants for test cases.
    '''
    def setUp(self):
        app.app.config["TESTING"] = True
        self.client = app.app.test_client()
        self.STAT =  200
        self.CLG_PTH = "/colleges"
        self.HSG_PTH = "/housing"
        self.JOB_PTH = "/jobs"
        self.CLG_CNT = 4000
        self.HSG_CNT = 132
        self.JOB_CNT = 1947
        self.SRCH_PTH = "/search"

    def testGetAllColleges(self):
        '''
            Test that obtaining all instances of colleges is functional.
        '''
        with self.client:
            res = self.client.get(self.CLG_PTH)
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(len(data), self.CLG_CNT)

    def testGetAllHousing(self):
        '''
            Test that obtaining all instances of housing is functional.
        '''
        with self.client:
            res = self.client.get(self.HSG_PTH)
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(len(data), self.HSG_CNT)

    def testGetAllJobs(self):
        '''
            Test that obtaining all instances of jobs is functional.
        '''
        with self.client:
            res = self.client.get(self.JOB_PTH)
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(len(data), self.JOB_CNT)

    def testGetACollege(self):
        '''
            Test that obtaining a single particular instance of college works.
        '''
        with self.client:
            res = self.client.get(self.CLG_PTH + "/209807")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(data["name"], "Portland State University")
            self.assertEqual(data["city"], "Portland")

    def testGetAHousing(self):
        '''
            Test that obtaining a single particular instance of housing works.
        '''
        with self.client:
            res = self.client.get(self.HSG_PTH +
                                "/8449-Belmont-Valley-St,-Las-Vegas,-NV-89123")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(data["address"],
                                "8449 Belmont Valley St, Las Vegas, NV 89123")
            self.assertEqual(data["bedrooms"], 4)

    def testGetAJob(self):
        '''
            Test that obtaining a single particular instance of a job works.
        '''
        with self.client:
            res = self.client.get(self.JOB_PTH + "/3827916996")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(data["company"], "Houston Methodist")
            self.assertEqual(data["salary_max"], 85865)

    def testAllSearch(self):
        '''
            Test all models for search under a common attribute.
        '''
        with self.client:
            res = self.client.get(self.SRCH_PTH + "/portland")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json
            clgs, hsg, jobs = data["colleges"], data["housing"], data["jobs"]
            self.assertEqual(len(clgs), 22)
            self.assertEqual(len(hsg), 1)
            self.assertEqual(len(jobs), 9)

    def testModelSearch(self):
        '''
            Test a single model of our choice for search.
        '''
        with self.client:
            res = self.client.get(self.SRCH_PTH + "/job/portland")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(len(data), 9)
            self.assertEqual(data[5]["company"], "NaphCare")


if __name__ == "__main__":
    unittest.main()