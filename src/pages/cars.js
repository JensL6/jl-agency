import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { COLORS } from "../constants"
import {
  Car, BottomEdgeDown,
  BottomEdgeUp, Image, Wrapper
} from "../pageStyles"


const CarsPage = () => {
  const {
    wpcontent: {
      page: {
        carsMeta: { carsPageDescription, carsPageHeaderPicture },
      },
      cars: { edges: cars },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "cars", idType: URI) {
          carsMeta {
            carsPageDescription
            carsPageHeaderPicture {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        cars {
          edges {
            node {
              car {
                brand
                model
                country
                profile {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Seo title="Cars" />
      <Wrapper carsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={carsPageHeaderPicture.imageFile.childImageSharp.fluid}
            alt={carsPageHeaderPicture.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>We are JL-Agency</h2>
          <p>{carsPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="cars">
          <h2>Our Cars</h2>
          <div className="car-items">
            {cars.map(({ node: { car, slug } }) => (
              <Car to={`/${slug}`} key={slug}>
                <Image
                  fluid={car.profile.imageFile.childImageSharp.fluid}
                  alt={car.profile.altText}
                />
                <div className="car-info">
                  <p>
                    {car.brand} {car.model}
                  </p>
                  {car.country && <p>{car.country}</p>}
                </div>
              </Car>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default CarsPage