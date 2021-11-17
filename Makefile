.PHONY=graphql clean

clean:
	rm -rf .cache public

graphql:
	open http://localhost:8000/___graphql
