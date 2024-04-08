package token

import "time"

type Maker interface {
	CreateToken(username string, duration time.Duration) (string, error)
	VerifyToker(token string) (*Payload, error)
}