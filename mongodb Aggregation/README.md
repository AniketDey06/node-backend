<img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/0*BmLKgrU_qFtakYsB.png">

# Aggregation Pipline

An aggregation pipeline consists of one or more [**stages**](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#std-label-aggregation-pipeline-operator-reference) that process documents:

- Each stage performs an operation on the input documents. For example, a stage can filter documents, group documents, and calculate values.
- The documents that are output from a stage are passed to the next stage.
- An aggregation pipeline can return results for groups of documents. For example, return the total, average, maximum, and minimum values.

<hr>

**$match** Filters documents based on a specified query predicate. Matched documents are passed to the next pipeline stage.Passes the document which satisfy the particular field.

```bash
1.

[
    {
        $match: {
            isActive: true
        }
    },
    {
        $count: 'Active Users'
    }
]
```

```bash
2.

[
    {
        $group: {
            _id: null,
            averageAge: {
                $avg: "$age"
            }
        }
    }
]
```

```bash
3.

[
    {
        $group: {
            _id: "$favoriteFruit",
                count: {
                $sum: 1
            }
        },
    },
    {
        $sort: {
            count: -1
        }
    },
    {
        $limit: 2
    }
]
```

```bash
4.

[
    {
        $group: {
            _id: "$gender",
            count: {
                $sum: 1
            }
        }
    }
]
```

```bash
5.

[
    {
        $group: {
            _id: "$company.location.country",
            countryCount: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            countryCount: -1
        }
    },
    {
        $limit: 2
    }
]

```

```bash
6.

[
  {
    $unwind: {
      path: "$tags",
    },
  },
  {
    $group: {
      _id: '$_id',
      numberOfTags: {
        $sum: 1
      }
    }
  },
  {
    $group: {
      _id: null,
     	avgNumOfTags: {
        $avg: "$numberOfTags"
      }
    }
  }
]

```
```bash
6.

[
  {
    $addFields: {
      numOfTags: {
        $size: {
          $ifNull: ["$tags", []]
        }
      }
    }
  },
  {
    $group: {
      _id: null,
      avgNumOfTags: {
       	 $avg: "$numOfTags"
      }
    }
  }
]
```
```bash
8.

[
  {
    $match: {
			isActive: false,
      tags: "velit", 
    }
  },
  {
    $project: {
      name: 1,
      age: 1
    }
  }
]
```
```bash
8.

[
  {
    $match: {
    	"company.phone" : /^\+1 \(940\)/
    }
  },
  {
    $count: 'ph no'
  }
]
```

```bash
9.

[
  {
    $sort: {
      registered: -1
    }
  },
  {
    $limit: 4
  },
  {
    $project: {
      registered: 1,
      name: 1,
      favoriteFruit: 1
    }
  }
]
```


```bash
10.

[
	{
	  $group: {
	    _id: "$favoriteFruit",
      users: {$push: "$name"}
	  }
	}
] 
```

```bash
11.

[
  {
    $match: {
      tags: {
        $all: ["enim", "id"],
      },
    },
  },
]
```

```bash
12.

[
  {
    $match: {
      "company.location.country": "USA",
    },
  },
  {
    $group: {
      _id: "$company.title",
      userCount: {
        $sum: 1,
      },
    },
  },
]
```

```bash
13.

[
  {
    $match: {
      "company.location.country": "USA",
    },
  },
  {
    $group: {
      _id: "$company.title",
      userCount: {
        $sum: 1,
      },
    },
  },
]
```

```bash
14.

[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details"
    }
  },
  {
    $addFields: {
      author_details: {
        $arrayElemAt: ["$author_details", 0]
      }
    }
  }
]
```