import app
import unittest

# Influenced by GeoJob's implementation

"""
    TODO: figure out what other tests we should include, like pagination,
    instances, model search, etc.
"""


class Tests(unittest.TestCase):
    def setUp(self):
        app.app.config["TESTING"] = True
        self.client = app.app.test_client()

    def testGetAllColleges(self):
        with self.client:
            pass

    def testGetAllHousing(self):
        with self.client:
            pass

    def testGetAllJobs(self):
        with self.client:
            pass

    def testAllSearch(self):
        with self.client:
            pass


if __name__ == "__main__":
    unittest.main()
