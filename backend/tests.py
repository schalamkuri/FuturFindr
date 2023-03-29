import app
import unittest

# Influenced by GeoJob's implementation

class Tests(unittest.TestCase):
    # Set up common resources and constants for test cases.
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

    # Test that obtaining all instances of colleges is functional.
    def testGetAllColleges(self):
        with self.client:
            res = self.client.get(self.CLG_PTH)
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(len(data), self.CLG_CNT)

    # Test that obtaining all instances of housing is functional.
    def testGetAllHousing(self):
        with self.client:
            res = self.client.get(self.HSG_PTH)
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(len(data), self.HSG_CNT)

    # Test that obtaining all instances of jobs is functional.
    def testGetAllJobs(self):
        with self.client:
            res = self.client.get(self.JOB_PTH)
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(len(data), self.JOB_CNT)

    # Test that obtaining a single particular instance of college works.
    def testGetACollege(self):
        with self.client:
            res = self.client.get(self.CLG_PTH + "/209807")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(data["name"], "Portland State University")
            self.assertEqual(data["city"], "Portland")

    # Test that obtaining a single particular instance of housing works.
    def testGetAHousing(self):
        with self.client:
            res = self.client.get(self.HSG_PTH +
                                "/8449-Belmont-Valley-St,-Las-Vegas,-NV-89123")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(data["address"],
                                "8449 Belmont Valley St, Las Vegas, NV 89123")
            self.assertEqual(data["bedrooms"], 4)

    # Test that obtaining a single particular instance of a job works.
    def testGetAJob(self):
        with self.client:
            res = self.client.get(self.JOB_PTH + "/3827916996")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(data["company"], "Houston Methodist")
            self.assertEqual(data["salary_max"], 85865)

    # Test all models for search under a common attribute.
    def testAllSearch(self):
        with self.client:
            res = self.client.get(self.SRCH_PTH + "/portland")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json
            clgs, hsg, jobs = data["colleges"], data["housing"], data["jobs"]
            self.assertEqual(len(clgs), 22)
            self.assertEqual(len(hsg), 1)
            self.assertEqual(len(jobs), 9)

    # Test a single model of our choice for search.
    def testModelSearch(self):
        with self.client:
            res = self.client.get(self.SRCH_PTH + "/job/portland")
            self.assertEqual(res.status_code, self.STAT)
            data = res.json["data"]
            self.assertEqual(len(data), 9)
            self.assertEqual(data[5]["company"], "NaphCare")


if __name__ == "__main__":
    unittest.main()