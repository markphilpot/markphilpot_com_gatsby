.PHONY=graphql clean bear

clean:
	rm -rf .cache public

graphql:
	open http://localhost:8000/___graphql

bear:
	yarn bear
