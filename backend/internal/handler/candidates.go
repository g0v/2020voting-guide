package handler

import (
	"fmt"
	"log"
	"net/http"

	"github.com/g0v/2020voting-guide/backend/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/spf13/viper"
)

// @Summary List candidates by constituency
// @Description list candidates by constituency
// @Accept json
// @Produce json
// @Param constituency path string true "Constituency"
// @Success 200 {object} models.CandidateCards
// @Router /candidates/constituency/{constituency} [get]
func ListCandidatesByConstituencyHandler(c *gin.Context) {

	constituency := c.Param("constituency")
	fmt.Println(constituency)

	viper.SetConfigType("yaml")
	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	if err := viper.ReadInConfig(); err == nil {
		fmt.Println("Using config file:", viper.ConfigFileUsed())
	}

	var configuration Config
	err := viper.Unmarshal(&configuration)
	if err != nil {
		log.Fatalf("unable to decode into struct, %v", err)
	}
	fmt.Println(configuration)

	db, err := gorm.Open(
		"mysql",
		fmt.Sprintf("%s:%s@tcp(%s:3306)/%s",
			configuration.Mysql.User,
			configuration.Mysql.Password,
			configuration.Mysql.Host,
			configuration.Mysql.DB))
	if err != nil {
		panic(err)
	}
	defer db.Close()

	var candidates models.CandidateCards
	db.Table("candidates").Where("constituency = ?", constituency).Find(&candidates)
	fmt.Println(candidates)

	c.JSON(http.StatusOK, candidates)
}
