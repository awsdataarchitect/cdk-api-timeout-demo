import time
import json

def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

def generate_primes(n):
    primes = []
    for num in range(2, n + 1):
        if is_prime(num):
            primes.append(num)
    return primes

def handler(event, context):
    # Start the timer
    start_time = time.time()

    # Generate prime numbers up to a large limit
    prime_limit = 800000
    primes = generate_primes(prime_limit)

    # Calculate the total processing time
    end_time = time.time()
    total_time = end_time - start_time

    # Create the response object
    response = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps({
            'prime_limit': prime_limit,
            'primes': primes,
            'processing_time': total_time
        })
    }

    return response
